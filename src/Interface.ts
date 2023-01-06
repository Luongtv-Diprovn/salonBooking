export interface Product {
    id: number
    brand: string
    name: string
    price: string
    price_sign: string
    currency: string
    image_link: string
    product_link: string
    website_link: string
    description: string
    rating: any
    category: string
    product_type: string
    tag_list: string[]
    created_at: string
    updated_at: string
    product_api_url: string
    api_featured_image: string
    product_colors: ProductColor[]
}

export interface ProductColor {
    hex_value: string
    colour_name: string
}

export interface ProductType {
    id: number,
    endPoint: string,
    name: string,
    imagePath: string
}