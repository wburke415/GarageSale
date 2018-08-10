class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.integer :user_id, null: false
      t.string :country, null: false, default: "United States"
      t.string :state, null: false, default: "California"
      t.string :city, null: false, default: "San Francisco"
      t.string :address, null: false, default: "422 Not A Real Avenue"
      t.string :zip_code, null: false, default: "94111"
      t.timestamps
    end

    add_index :locations, :user_id
  end
end
