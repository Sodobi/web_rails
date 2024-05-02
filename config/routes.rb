Rails.application.routes.draw do
  resources :values
  resources :images
  resources :themes
  resources :users

  root 'main#index'
end
