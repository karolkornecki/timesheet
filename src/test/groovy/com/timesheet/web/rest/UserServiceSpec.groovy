package com.timesheet.web.rest

import com.timesheet.domain.User
import com.timesheet.repository.UserRepository
import com.timesheet.service.UserService
import com.timesheet.web.rest.dto.UserDTO
import spock.lang.Specification

/**
 * Unit tests for {@link com.timesheet.service.UserService}
 *
 * @author Karol Kornecki
 */
class UserServiceSpec extends Specification {

    def "Should find user with two managed team members and map only their firstName and lastName property in DTO"() {

        given:
        String login = "admin"
        UserService userService = new UserService()
        userService.userRepository = Mock(UserRepository)

        User member_0 = Mock(User.class)
        member_0.firstName >> "ZZZ"
        member_0.lastName >> "ZZZ"
        member_0.login >> "zzz"

        User member_1 = Mock(User.class)
        member_1.firstName >> "AAA"
        member_1.lastName >> "AAA"
        member_1.login >> "aaa"

        User user = Mock(User.class)
        user.getUsers() >> [member_0, member_1]

        1 * userService.userRepository.findOneByLogin(login) >> Optional.of(user)

        when:
        List<UserDTO> members = userService.findTeamMembers(login)

        then:
        members.size() == 2
        members[0].firstName == "AAA"
        members[0].lastName == "AAA"
        members[0].login == "aaa"
        members[1].firstName == "ZZZ"
        members[1].login == "zzz"
    }

    def "Should return empty list of team members because of non existing user with given id"() {

        given:
        String login = "admin"
        UserService userService = new UserService()
        userService.userRepository = Mock(UserRepository)

        1 * userService.userRepository.findOneByLogin(login) >> Optional.empty()

        when:
        List<UserDTO> members = userService.findTeamMembers(login)

        then:
        members.size() == 0
    }

}
