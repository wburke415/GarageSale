class Api::ProductsController < ApplicationController

    def show
        @product = Product.includes(:bids, :seller, :shipping_policy, :location).find_by(id: params[:id])
    end

    def index

        if params[:search] == "splash"
            products = Product.all
            @products = products.sample(20)
        elsif params[:search] == "?dailydeals"
            products = Product.all
            @products = products.sort_by {|product| product.starting_price || product.bin_price }[0..20]
        else
            search = params[:search].include?('%20') ? params[:search].delete("?").split("%20").join(" ") : params[:search].delete("?")
            search = "%#{search}%".downcase
            @products = Product.includes(:bids, :seller, :shipping_policy, :location).where("search_string LIKE ?", search)
        end 
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