class Api::ProductsController < ApplicationController

    def show
        @product = Product.includes(:product_images, :bids).find_by(id: params[:id])
    end

    def index
        
    end

    def create
        @product = Product.new(product_params)
        if @product.save
            render "api/products/show"
        else
            render json: @product.errors.full_messages, status: 422
        end
    end

    def update
        @product = Product.find_by(id: params[:id])
        if @product && @product.update_attributes(product_params)
            render "api/products/show"
        else
            render json: @product.errors.full_messages, status: 422
        end
    end

    def destroy
        @product = Product.find_by(id: params[:id])
        if @product && @product.destroy
            render "api/products/show"
        else
            render json: @product.errors.full_messages, status: 401
        end
    end 

    private

    def product_params
        params.require(:product).permit(
            :seller_id, 
            :category_id, 
            :payment_policy_id, 
            :shipping_policy_id, 
            :return_policy_id, 
            :location_id, 
            :title, 
            :subtitle, 
            :sku, 
            :condition, 
            :condition_description, 
            :auction, 
            :duration, 
            :starting_price, 
            :bin_price, 
            :reserve_price, 
            :quantity
            )
    end 

end 