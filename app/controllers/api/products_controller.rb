class Api::ProductsController < ApplicationController

    def show
        @product = Product.includes(:bids, :seller, :shipping_policy, :location).find_by(id: params[:id])
    end

    def index
        @products = Product.includes(:bids, :seller).all
    end

    def create
        @product = Product.new(product_params)
        
        params[:photos].each_with_index do |photo, idx|
            @product.photos.attach(io: photo, filename: "product_photo_#{idx}.jpg")
        end

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
        debugger
        params.require(:product).permit(
            :seller_id, 
            :buyer_id,
            :category_id, 
            :payment_policy_id, 
            :shipping_policy_id, 
            :return_policy_id, 
            :sold,
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
            :quantity,
            :description,
            )
    end 

end 