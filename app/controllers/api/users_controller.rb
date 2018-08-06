class Api::UsersController < ApplicationController

  
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      # render users show page or the homepage
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show

  end

  def update

  end

  def destroy

  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :username, :email, :business, :password)
  end

end
