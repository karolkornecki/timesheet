package com.timesheet.repository;

import com.timesheet.domain.ManagedProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * * Spring Data JPA repository for the ManagedProject entity.
 *
 * @author Karol Kornecki
 */
public interface ManagedProjectRepository extends JpaRepository<ManagedProject, String> {

    @Query("SELECT m FROM ManagedProject m WHERE m.user.login = :login")
    List<ManagedProject> findUserManagedProjects(@Param("login") String login);
}
