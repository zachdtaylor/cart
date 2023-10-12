//
//  DailyScrum.swift
//  Cart
//
//  Created by Zach Taylor on 10/11/23.
//

import Foundation

struct DiscoverRecipe: Identifiable {
    let id: UUID
    var name: String
    var userFullName: String
    
    init(id: UUID = UUID(), name: String, userFullName: String) {
        self.id = id
        self.name = name
        self.userFullName = userFullName
    }
}

extension DiscoverRecipe {
    static let sampleData = [
        DiscoverRecipe(name: "Pepperoni Pizza Rolls",
                       userFullName: "Zach Taylor"),
        DiscoverRecipe(name: "Taco Pasta",
                   userFullName: "Madelyn Smith"),
        DiscoverRecipe(name: "Classic Cob Salad",
                   userFullName: "Madison Taylor")
    ]
}
