class RemoveCommentFromHearts < ActiveRecord::Migration
  def change
    change_table(:hearts) do |t|
      t.remove :comment
    end
  end
end
