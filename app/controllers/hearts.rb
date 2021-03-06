post '/hearts' do
  @heart = Heart.create(params[:heart])
  @errors = @heart.errors.full_messages
  @photo = Photo.find(@heart.photo_id)
  if request.xhr? 
    {photo: @photo.id, heart_count: @photo.heart_count.to_s}.to_json
  else
    redirect "/photos/#{params[:heart][:photo_id]}"
  end
end

delete '/hearts' do
  @heart = Heart.find_by(user_id: params[:user_id], photo_id: params[:photo_id])
  @heart.destroy
  @photo = Photo.find(@heart.photo_id)
  heart_info = {heart_count: @photo.heart_count.to_s, heart_id: @heart.id.to_s, photo: @photo.id}
  if request.xhr?
    heart_info.to_json
  else
    redirect "/photos/#{params[:photo_id]}"
  end
end

get '/hearts/:id/delete' do
  if !is_admin?
    erb :access_denied
  else
    heart = Heart.find(params[:id])
    heart.destroy
    redirect "/photos/#{heart.photo.id}"
  end
end