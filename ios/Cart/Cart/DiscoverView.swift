//
//  DiscoverView.swift
//  Cart
//
//  Created by Zach Taylor on 10/11/23.
//

import SwiftUI

struct DiscoverView: View {
    let recipes: [DiscoverRecipe]
    
    var body: some View {
        List(recipes) { recipe in
            CardView(recipe: recipe)
        }
    }
}

struct DiscoverView_Previews: PreviewProvider {
    static var previews: some View {
        DiscoverView(recipes: DiscoverRecipe.sampleData)
    }
}
