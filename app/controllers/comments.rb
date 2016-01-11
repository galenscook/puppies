post '/comments' do
  @heart = Heart.create(params[:heart])
  @errors = @heart.errors.full_messages
  @photo = Photo.find(@heart.photo_id)
  if request.xhr? 
    {html: (erb :'/hearts/_comment', layout: false, locals: {heart: @heart}), photo: @photo.id, heart_count: @photo.heart_count.to_s}.to_json
  else
    redirect "/photos/#{params[:heart][:photo_id]}"
  end
end

#
put '/hearts' do

end

delete '/comments' do
  @comment = Comment.find_by(user_id: params[:user_id], photo_id: params[:photo_id])
  @comment.destroy
  @photo = Photo.find(params[:photo_id])
  heart_info = {heart_count: @photo.heart_count.to_s, heart: :'/hearts/_heart', heart_id: @heart.id.to_s, photo: @photo.id}
  if request.xhr?
    heart_info.to_json
  else
    redirect "/photos/#{params[:photo_id]}"
  end
end

get '/comments/:id/delete' do
  if !is_admin?
    erb :access_denied
  else
    heart = Heart.find(params[:id])
    heart.destroy
    redirect "/photos/#{heart.photo.id}"
  end
end