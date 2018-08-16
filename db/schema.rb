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

ActiveRecord::Schema.define(version: 2018_08_15_163307) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bids", force: :cascade do |t|
    t.integer "product_id", null: false
    t.float "bid", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "buyer_id", null: false
    t.index ["buyer_id"], name: "index_bids_on_buyer_id"
    t.index ["product_id"], name: "index_bids_on_product_id"
  end

  create_table "locations", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "country", default: "United States", null: false
    t.string "state", default: "California", null: false
    t.string "city", default: "San Francisco", null: false
    t.string "address", default: "422 Not A Real Avenue", null: false
    t.string "zip_code", default: "94111", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_locations_on_user_id"
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
    t.text "description", null: false
    t.boolean "sold", default: false, null: false
    t.integer "buyer_id"
    t.string "search_string", null: false
    t.index ["buyer_id"], name: "index_products_on_buyer_id"
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["payment_policy_id"], name: "index_products_on_payment_policy_id"
    t.index ["return_policy_id"], name: "index_products_on_return_policy_id"
    t.index ["search_string"], name: "index_products_on_search_string"
    t.index ["seller_id"], name: "index_products_on_seller_id"
    t.index ["shipping_policy_id"], name: "index_products_on_shipping_policy_id"
    t.index ["sold"], name: "index_products_on_sold"
    t.index ["title"], name: "index_products_on_title"
  end

  create_table "shipping_policies", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "location_id", null: false
    t.float "shipping_cost", default: 3.5, null: false
    t.string "service", default: "Standard Shipping", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location_id"], name: "index_shipping_policies_on_location_id"
    t.index ["user_id"], name: "index_shipping_policies_on_user_id"
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
