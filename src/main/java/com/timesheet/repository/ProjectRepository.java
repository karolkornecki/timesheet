package com.timesheet.repository;

import com.timesheet.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Project entity.
 *
 * @author Karol Kornecki
 */
public interface ProjectRepository extends JpaRepository<Project, Long> {
}
