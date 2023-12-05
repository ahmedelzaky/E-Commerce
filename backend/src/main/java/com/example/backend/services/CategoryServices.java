package com.example.backend.services;

import com.example.backend.models.Category;
import com.example.backend.repositorys.CategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServices {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ImageService imageServices;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public boolean isCategoryExist(String name) {
        Optional<Category> category = categoryRepository.findByName(name);
        return category.isPresent();
    }

    public void addCategory(Category category, MultipartFile image) throws IOException {
        boolean exist = isCategoryExist(category.getName());
        if (exist) throw new IllegalStateException("this category " + category.getName() + " is already exist");

        String imageUrl = imageServices.uploadImage(image);
        category.setImageUrl(imageUrl);

        categoryRepository.save(category);
    }

    @Transactional
    public void updateCategory(Long id, Category updatedCategory, MultipartFile image) throws IOException {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new IllegalStateException("this category dose not exist"));
        if (updatedCategory.getName() != null
                && !updatedCategory.getName().isEmpty()
                && !updatedCategory.getName().equals(category.getName())) {
            category.setName(updatedCategory.getName());
        }
        if (image != null) {
            String imageUrl = imageServices.uploadImage(image);
            category.setImageUrl(imageUrl);
        }
    }

    public void deleteCategory(Long id) {
        boolean exist = categoryRepository.existsById(id);
        if (!exist) throw new IllegalStateException("this category dose not exist");

        categoryRepository.deleteById(id);
    }
}
