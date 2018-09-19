require 'sidekiq-scheduler'

class ProductWatcherWorker
  include Sidekiq::Worker

  def perform(*args)
    products = Product.all
    ended_products = [];
    current_time = DateTime.now
    products.each do |product|
    end
  end
end