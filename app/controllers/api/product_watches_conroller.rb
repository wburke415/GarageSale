class Api::ProductWatchesController < ApplicationController
  def create
    @product_watch = ProductWatch.new(product_watch_params)

    if @product_watch.save
      @product = Product.find_by(id: @product_watch.product_id)
      render "api/products/show"
    else
      render json: @product_watch.errors.full_messages, status: 422
    end
  end

  def destroy
    @product_watch = ProductWatch.find_by(id: params[:id])

    if @product_watch && @product_watch.destroy
      @product = Product.find_by(id: @product_watch.product_id)
      render 'api/products/show'
    else
      render json: @product_watch.errors.full_messages, status: 404
    end 
  end

  private

  def product_watch_params
    params.require(:product_watch).permit(:product_id, :watcher_id)
  end
end