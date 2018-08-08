class Product < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.integer :seller_id, null: false
      t.integer :category_id, null: false
      t.integer :payment_policy_id, null: false
      t.integer :shipping_policy_id, null: false
      t.integer :return_policy_id, null: false
      t.integer :location_id, null: false
      t.string :title, null: false
      t.string :subtitle
      t.string :sku
      t.integer :condition, null: false
      t.string :condition_description
      t.boolean :auction, null: false, default: true
      t.integer :duration, null: false, default: 7
      t.float :starting_price, null: false
      t.float :bin_price
      t.float :reserve_price
      t.integer :quantity, null: false, default: 1
      t.timestamps
    end

    add_index :products, :seller_id
    add_index :products, :category_id
    add_index :products, :payment_policy_id
    add_index :products, :shipping_policy_id
    add_index :products, :return_policy_id
    add_index :products, :location_id
    add_index :products, :title
  end
end