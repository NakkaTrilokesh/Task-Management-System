package task.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import task.model.Menus;

@Repository
public interface MenusRepository extends JpaRepository<Menus, Long>{

}
