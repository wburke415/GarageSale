class CreateProductPurchases < ActiveRecord::Migration[5.2]
  def change
    create_table :product_purchases do |t|
      t.integer :product_id, null: false
      t.integer :buyer_id, null: false
      t.timestamps
    end

    add_index :product_purchases, :product_id
    add_index :product_purchases, :buyer_id
  end
end
