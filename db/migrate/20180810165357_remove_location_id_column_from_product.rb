class RemoveLocationIdColumnFromProduct < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :location_id
  end
end
