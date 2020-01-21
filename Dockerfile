FROM ruby:2.5.0-stretch as AssetBuilder

# For adding Yarn
ADD https://dl.yarnpkg.com/debian/pubkey.gpg /tmp/yarn-pubkey.gpg
RUN apt-key add /tmp/yarn-pubkey.gpg && rm /tmp/yarn-pubkey.gpg
RUN echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash && \
  apt-get update && apt-get install -y \
  build-essential graphviz nodejs yarn

RUN mkdir -p /app
WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler \
  && bundle config --global frozen 1 \
  && bundle install --without development test --jobs 20 --retry 5 \
  # Remove unneeded files (cached *.gem, *.o, *.c)
  && rm -rf /usr/local/bundle/cache/*.gem \
  && find /usr/local/bundle/gems/ -name "*.c" -delete \
  && find /usr/local/bundle/gems/ -name "*.o" -delete

COPY package.json yarn.lock ./
RUN npm install

COPY . ./

# RUN bundle exec rake assets:precompile

RUN rm -rf node_modules tmp/cache vendor/assets lib/assets spec

#######################
FROM ruby:2.5.0-stretch

RUN apt-get update && apt-get install -y \
  build-essential nodejs

RUN groupadd -r whitman && useradd --no-log-init -r -g whitman whitman -m

COPY --from=AssetBuilder /usr/local/bundle/ /usr/local/bundle/
COPY --from=AssetBuilder --chown=whitman:whitman /app /app

USER whitman

WORKDIR /app

EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "--environment", "production"]
# CMD ["bundle", "exec", "sidekiq", "-C", "config/sidekiq.yml"]
