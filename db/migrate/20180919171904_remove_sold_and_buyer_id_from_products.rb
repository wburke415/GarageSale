class RemoveSoldAndBuyerIdFromProducts < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :sold
    remove_column :products, :buyer_id
  end
end
