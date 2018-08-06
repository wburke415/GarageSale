class Api::SessionsController < ApplicationController

    def create
        @user = User.find_by_credentials(
            params[:user][:email],
            params[:user][:password]
        )
        if @user
            login(user)
            #render users show page or the homepage
        else
            render json: ["Invalid username or password"], status: 401
        end 
    end

    def destroy
        @user = current_user
        if @user
            logout
            # possibly render home page? - gotta render something here
        else
            render json: ["No users are signed in"], status: 404
        end 
    end 

end 