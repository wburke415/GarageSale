# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_09_204912) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bids", force: :cascade do |t|
    t.integer "product_id", null: false
    t.float "bid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "buyer_id", null: false
    t.index ["buyer_id"], name: "index_bids_on_buyer_id"
    t.index ["product_id"], name: "index_bids_on_product_id"
  end

  create_table "product_images", force: :cascade do |t|
    t.integer "product_id", null: false
    t.string "image_url", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_product_images_on_product_id"
  end

  create_table "products", force: :cascade do |t|
    t.integer "seller_id", null: false
    t.integer "category_id", null: false
    t.integer "payment_policy_id", null: false
    t.integer "shipping_policy_id", null: false
    t.integer "return_policy_id", null: false
    t.integer "location_id", null: false
    t.string "title", null: false
    t.string "subtitle"
    t.string "sku"
    t.string "condition", null: false
    t.string "condition_description"
    t.boolean "auction", default: true, null: false
    t.integer "duration", default: 7, null: false
    t.float "starting_price", null: false
    t.float "bin_price"
    t.float "reserve_price"
    t.integer "quantity", default: 1, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["location_id"], name: "index_products_on_location_id"
    t.index ["payment_policy_id"], name: "index_products_on_payment_policy_id"
    t.index ["return_policy_id"], name: "index_products_on_return_policy_id"
    t.index ["seller_id"], name: "index_products_on_seller_id"
    t.index ["shipping_policy_id"], name: "index_products_on_shipping_policy_id"
    t.index ["title"], name: "index_products_on_title"
  end

  create_table "users", force: :cascade do |t|
    t.string "firstname", null: false
    t.string "lastname", null: false
    t.string "username", null: false
    t.string "email", null: false
    t.boolean "business", default: false, null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
