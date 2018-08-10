class CreateShippingPolicies < ActiveRecord::Migration[5.2]
  def change
    create_table :shipping_policies do |t|
      t.integer :user_id, null: false
      t.integer :location_id, null: false
      t.float :shipping_cost, null: false, default: 3.50
      t.string :service, null: false, default: "Standard Shipping"
      t.timestamps
    end

    add_index :shipping_policies, :user_id
    add_index :shipping_policies, :location_id
  end
end
