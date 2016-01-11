class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :user
      t.references :photo
      t.string :comment

      t.timestamps
    end
  end
end
