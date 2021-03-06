class Api::ProductsController < ApplicationController

  def show
    @product = Product.includes(:bids, :seller, :shipping_policy, :location, :product_images, :product_watches).find_by(id: params[:id])
  end

  def index
    if params[:search] == "splash"
      products = Product.includes(:bids, :seller, :shipping_policy, :location, :product_images, :product_watches).where("ends_at > ?", DateTime.now)
      @products = products.sample(50)

    elsif params[:search] == "?dailydeals"
      products = Product.includes(:bids, :seller, :shipping_policy, :location, :product_images, :product_watches).where("ends_at > ?", DateTime.now)
      selected_products = products.select do |product| 
        price = product.starting_price || product.bin_price
        (price > 5 && price < 20)
      end 
      @products = selected_products.sample(20)

    elsif params[:search][1..9] == "category="
      category = params[:search][10..-1].to_i
      @products = Product.includes(:bids, :seller, :shipping_policy, :location, :product_images, :product_watches).where("category_id = ? AND ends_at > ?", category, DateTime.now)

    else
      search = params[:search].include?('%20') ? params[:search].delete("?").split("%20").join(" ") : params[:search].delete("?")
      search = "%#{search}%".downcase
      @products = Product.includes(:bids, :seller, :shipping_policy, :location, :product_images, :product_watches).where("search_string LIKE ? AND ends_at > ?", search, DateTime.now)
    end 
  end
  
  def search
    search = params[:search].include?('%20') ? params[:search].delete("?").split("%20").join(" ") : params[:search].delete("?")
    search = "%#{search}%".downcase
    @products = Product.where("search_string LIKE ?", search)
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
      :title, 
      :subtitle, 
      :sku, 
      :condition, 
      :condition_description, 
      :auction, 
      :ends_at, 
      :duration,
      :starting_price, 
      :bin_price, 
      :quantity,
      :description,
      )
  end 

end 