class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  def current_user
    @current_user = User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def login(user)
    @current_user = user
    user.session_token = user.reset_session_token!
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def ensure_correct_current_user(user)
    unless current_user.id == user.id
      render json: ["Invalid credentials"], status: 401   #make sure to check this later on
    end 
  end
  
end
