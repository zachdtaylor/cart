//
//  CartApp.swift
//  Cart
//
//  Created by Zach Taylor on 10/8/23.
//

import SwiftUI

@main
struct CartApp: App {
    var body: some Scene {
        WindowGroup {
            DiscoverView(recipes: DiscoverRecipe.sampleData)
        }
    }
}
