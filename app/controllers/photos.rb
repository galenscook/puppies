get '/photos' do              # display a list of all things
  @photos = Photo.all
  erb :'/photos/index'
end

get '/photos/new' do          # return an html form for creating a new thing
  erb :'/photos/new'
end

post '/photos' do             # create a new thing
  photo = Photo.create(url: params[:url])
  if photo.save
    redirect "/photos/#{photo.id}"
  else
    @errors = photo.errors.full_messages
    erb :'/photos/new'
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
