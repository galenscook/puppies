post '/comments/:photo_id' do
  p "IN POST"
  @photo = Photo.find(params[:photo_id])
  @photo.comments << Comment.create(user_id: current_user.id, comment: params[:comment])
  @comment = @photo.comments.last
  if request.xhr? 
    {html: (erb :'/comments/_show', layout: false, locals: {comment: @comment}), photo: @photo.id}.to_json
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