post '/hearts' do
  @heart = Heart.create(params[:heart])
  @errors = @heart.errors.full_messages
  @photo = Photo.find(@heart.photo_id)
  if request.xhr? 
    {html: (erb :'/hearts/_comment', layout: false, locals: {heart: @heart}), heart_count: @photo.heart_count.to_s}.to_json
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
  heart_info = {heart_count: @photo.heart_count.to_s, heart: :'/hearts/_heart', heart_id: @heart.id.to_s}
  if request.xhr?
    heart_info.to_json
  else
    redirect "/photos/#{params[:photo_id]}"
  end
end