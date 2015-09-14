post '/hearts' do
  heart = Heart.create(params[:heart])
  @errors = heart.errors.full_messages
  redirect "/photos/#{params[:heart][:photo_id]}"
end

put '/hearts' do

end

delete '/hearts' do
  heart = Heart.find_by(user_id: params[:user_id], photo_id: params[:photo_id])
  heart.destroy
  redirect "/photos/#{params[:photo_id]}"
end