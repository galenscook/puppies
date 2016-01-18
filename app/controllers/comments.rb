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

delete '/comments/:comment_id' do
  @comment = Comment.find(params[:comment_id])
  @comment.destroy
  @photo = Photo.find(@comment.photo_id)
  if request.xhr?
    {comments: @photo.comments.all}.to_json
  else
    redirect "/photos/#{@photo.id}"
  end
end

get '/comments/:id/delete' do
  if !is_admin?
    erb :access_denied
  else
    comment = Comment.find(params[:id])
    comment.destroy
    redirect "/photos/#{comment.photo.id}"
  end
end