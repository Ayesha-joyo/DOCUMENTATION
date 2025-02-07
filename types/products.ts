
/*

export interface Product {
    _id : string;
    productName : string;
    _type : "product";
    image? : {
        asset : {
            _ref : string;
            _type : "image";
        }
    };
    price : number;
    description? : string;
    slug : {
        _type : "slug"
        current : string;
    };

    inventory : number;
}
*/

import type { Image } from "sanity"

export interface Product {
  _id: string
  _type: string
  productName: string
  image: Image
  price: number
  description: string
  colors?: string[]
  sizes?: string[]
  slug: {
    current: string
  }
}

export interface ProductDetailProps {
  product: Product
}



  
  