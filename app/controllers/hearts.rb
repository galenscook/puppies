post '/hearts' do
  @heart = Heart.create(params[:heart])
  @errors = @heart.errors.full_messages
  @photo = Photo.find(@heart.photo_id)
  heart_info = {heart_count: @photo.heart_count.to_s, comment: @heart.comment}
  if request.xhr? 
    heart_info.to_json
  else
    redirect "/photos/#{params[:heart][:photo_id]}"
  end
end

#
put '/hearts' do

end

delete '/hearts' do
  @heart = Heart.find_by(user_id: params[:user_id], photo_id: params[:photo_id])
  @comment = @heart.comment.to_s
  @heart.destroy
  @photo = Photo.find(@heart.photo_id)
  heart_info = {heart_count: @photo.heart_count.to_s, heart: :'/hearts/_heart', comment: @comment}
  if request.xhr?
    heart_info.to_json
  else
    redirect "/photos/#{params[:photo_id]}"
  end
end