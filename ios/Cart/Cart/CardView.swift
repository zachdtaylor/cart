//
//  CardView.swift
//  Cart
//
//  Created by Zach Taylor on 10/11/23.
//

import SwiftUI

struct CardView: View {
    let recipe: DiscoverRecipe
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(recipe.name)
                    .font(.headline)
                Spacer()
                Text(recipe.userFullName)
                    .font(.caption)
            }
            Spacer()
        }.padding()
    }
}

struct CardView_Previews: PreviewProvider {
    static var recipe = DiscoverRecipe.sampleData[0]
    static var previews: some View {
        CardView(recipe: recipe)
            .previewLayout(.fixed(width: 400, height: 40))
    }
}
