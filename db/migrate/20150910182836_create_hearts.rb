class CreateHearts < ActiveRecord::Migration
  def change
    create_table :hearts do |t|
      t.references :user
      t.references :photo
      t.string :comment

      t.timestamps
    end
  end
end
