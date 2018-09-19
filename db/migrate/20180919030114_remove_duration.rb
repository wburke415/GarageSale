class RemoveDuration < ActiveRecord::Migration[5.2]
  def change
    remove_column :products, :duration
  end
end
