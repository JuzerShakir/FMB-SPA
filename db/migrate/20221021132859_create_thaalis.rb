class CreateThaalis < ActiveRecord::Migration[7.0]
  def change
    create_table :thaalis do |t|
      t.integer :number
      t.integer :size
      t.string :owner

      t.timestamps
    end
    add_index :thaalis, :number, unique: true
  end
end
