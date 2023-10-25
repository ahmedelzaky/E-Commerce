package com.example.backend.services;

import com.example.backend.models.Category;
import com.example.backend.repositorys.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServices {
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public boolean isCategoryExist(String name) {
        Optional<Category> category = categoryRepository.findByName(name);
        return category.isPresent();
    }

    public void addCategory(Category category) {
        boolean exist = isCategoryExist(category.getName());
        if (exist)
            throw new IllegalStateException("this category " + category.getName() + " is already exist");
        categoryRepository.save(category);
    }

}
