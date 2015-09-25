get '/photos' do              # display a list of all things
  start = 0
  stop = 19
  @photos = Photo.all.order(created_at: :desc)[start..stop]
  if request.xhr?
    start = params[:start].to_i
    stop = params[:stop].to_i
    if Photo.last.id < start
      return 400
    end
    @photos = Photo.all.order(created_at: :desc)[start..stop]
    erb :'/photos/_photos.json', layout: false
  else
    erb :'/photos/index'
  end
end

get '/photos/new' do          # return an html form for creating a new thing
  erb :'/photos/new'
end

post '/photos' do             # create a new thing
  photo = Photo.new(url: params[:url])
  if photo.save
    redirect "/photos/#{photo.id}"
  else
    @photo = Photo.find_by(url: params[:url])
    @hearts = @photo.hearts.all.order(created_at: :desc)
    @errors = "Someone else beat you to this one!  Here it is."
    erb :'/photos/show'
  end
end

get '/photos/:id' do          # display a specific thing
  @photo = Photo.find(params[:id])
  @hearts = @photo.hearts.all.order(created_at: :desc)
  if request.xhr?
    erb :'/photos/show', layout: false
  else
  erb :'/photos/show'
  end
end

#ADMIN ONLY
get '/photos/:id/delete' do      # delete a specific thing
  if !is_admin?
    erb :access_denied
  else
    photo = Photo.find(params[:id])
    photo.destroy
    redirect '/'
  end
end


=begin
Unnecessary routes?
  
get '/photos/:id/edit' do     # return an html form for editing a thing
end

put '/photos/:id' do          # update a specific thing
end

#ADMIN ONLY
delete  '/photos/:id' do      # delete a specific thing
end

=end
