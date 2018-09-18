class Api::BidsController < ApplicationController

  def create
    @bid = Bid.new(bid_params)

    if @bid.save
      @product = Product.find_by(id: @bid.product_id)
      render "api/products/show"
    else
      render json: @bid.errors.full_messages, status: 422
    end
  end

  def destroy
    @bid = Bid.find_by(id: params[:id])
    if @bid && @bid.destroy
      render 'api/products/show'
    else
      render json: @bid.errors.full_messages, status: 404
    end 
  end 

  private

  def bid_params
    params.require(:bid).permit(:product_id, :buyer_id, :bid)
  end 
end 