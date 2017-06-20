Rails.application.routes.draw do
  get 'comments/new'

  get 'comments/create'

  get 'comments/index'

  get 'comments/show'

  get 'comments/destroy'

  get 'posts/new'

  get 'posts/create'

  get 'posts/index'

  get 'posts/show'

  get 'posts/destroy'

  root to: 'users#new'
  
  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  resources :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
