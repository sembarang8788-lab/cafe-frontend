export interface Product {
    id: string
    name: string
    price: number
    stock: number
    category: 'makanan' | 'minuman'
    image_url?: string | null
    created_at?: string
}

export interface Order {
    id: string
    user_id?: string | null
    total_amount: number
    created_at: string
    order_items?: OrderItem[]
    items?: OrderItem[] // Backend returns 'items' instead of 'order_items'
}

export interface OrderItem {
    product_id: string
    quantity: number
    price: number
}

export interface CartItem extends Product {
    qty: number
}

export type ViewType = "pos" | "inventory" | "report";
