class Api::UsersController < ApplicationController

  before_action only: [:update, :destroy] do
    ensure_correct_current_user(User.find_by(id: params[:id]))
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      # render homepage
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:id])
    if @user && 
  end

  def destroy

  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :username, :email, :business, :password)
  end

end
