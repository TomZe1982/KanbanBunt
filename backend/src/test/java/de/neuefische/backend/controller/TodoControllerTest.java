package de.neuefische.backend.controller;

import de.neuefische.backend.model.Status;
import de.neuefische.backend.model.Todo;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Order(0)
    @Test
    public void testEmptyTodosControllerGET() {
        String url = String.format("http://localhost:%d/api/todo", port);
        ResponseEntity<Todo[]> actualTodoResponse = testRestTemplate.getForEntity(url, Todo[].class);

        HttpStatus actualStatus = actualTodoResponse.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatus);

        Todo[] actualTodoResponseBody = actualTodoResponse.getBody();
        assertNotNull(actualTodoResponseBody);
        assertEquals(0, actualTodoResponseBody.length);
    }

    @Order(10)
    @Test
    public void testIllegalCreationOfTodo() {
        String url = String.format("http://localhost:%d/api/todo", port);

        Todo illegalArgumentTodo = new Todo("", "", Status.IN_PROGRESS);
        ResponseEntity<Void> actualTodoResponse = testRestTemplate.postForEntity(url, illegalArgumentTodo, Void.class);

        HttpStatus actualStatus = actualTodoResponse.getStatusCode();
        assertEquals(HttpStatus.BAD_REQUEST, actualStatus);

        Void emptyBody = actualTodoResponse.getBody();
        assertNull(emptyBody);
    }

    @Order(20)
    @Test
    public void testCreationOfTodoAndGet() {
        String url = String.format("http://localhost:%d/api/todo", port);

        Todo todo = new Todo("", "desc", Status.IN_PROGRESS);
        ResponseEntity<Todo> actualTodoResponse = testRestTemplate.postForEntity(url, todo, Todo.class);

        HttpStatus actualStatus = actualTodoResponse.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatus);

        Todo actualTodo = actualTodoResponse.getBody();

        assertNotNull(actualTodo);
        assertEquals(Status.OPEN, actualTodo.getStatus());

        // todo created, todo must be found on get

        ResponseEntity<Todo[]> actualTodoResponseGET = testRestTemplate.getForEntity(url, Todo[].class);

        actualStatus = actualTodoResponseGET.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatus);

        Todo[] actualTodoResponseBody = actualTodoResponseGET.getBody();
        assertNotNull(actualTodoResponseBody);
        assertEquals(1, actualTodoResponseBody.length);
    }

    @Order(30)
    @Test
    public void testGetSingleTodo() {
        String url = String.format("http://localhost:%d/api/todo", port);

        ResponseEntity<Todo[]> actualTodosResponseGET = testRestTemplate.getForEntity(url, Todo[].class);

        HttpStatus actualStatus = actualTodosResponseGET.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatus);

        Todo[] actualTodosResponseBody = actualTodosResponseGET.getBody();
        assertNotNull(actualTodosResponseBody);
        assertEquals(1, actualTodosResponseBody.length);

        Todo expectedTodo = actualTodosResponseBody[0];

        // get single item

        String getUrl = String.format("http://localhost:%d/api/todo/%s", port, expectedTodo.getId());

        ResponseEntity<Todo> actualTodoResponseGET = testRestTemplate.getForEntity(getUrl, Todo.class);

        HttpStatus actualStatusCode = actualTodoResponseGET.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatusCode);

        Todo actualTodo = actualTodoResponseGET.getBody();
        assertNotNull(actualTodo);
        assertEquals(expectedTodo, actualTodo);
    }

    @Order(35)
    @Test
    public void testUpdateSingleTodo() {
        String url = String.format("http://localhost:%d/api/todo", port);

        ResponseEntity<Todo[]> actualTodosResponseGET = testRestTemplate.getForEntity(url, Todo[].class);

        HttpStatus actualStatus = actualTodosResponseGET.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatus);

        Todo[] actualTodosResponseBody = actualTodosResponseGET.getBody();
        assertNotNull(actualTodosResponseBody);
        assertEquals(1, actualTodosResponseBody.length);

        Todo originTodo = actualTodosResponseBody[0];
        assertEquals(originTodo.getStatus(), Status.OPEN);

        // update single item

        Todo expectedTodo = new Todo("-1", "update description", Status.DONE);
        String updateUrl = String.format("http://localhost:%d/api/todo/%s/update", port, originTodo.getId());

        ResponseEntity<Todo> actualTodoResponsePut = testRestTemplate.exchange(
                updateUrl, HttpMethod.PUT, new HttpEntity<>(expectedTodo), Todo.class);

        HttpStatus actualStatusCode = actualTodoResponsePut.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatusCode);

        Todo actualTodo = actualTodoResponsePut.getBody();
        assertNotNull(actualTodo);

        assertEquals(originTodo.getId(), actualTodo.getId());
        assertEquals(expectedTodo.getDescription(), actualTodo.getDescription());
        assertEquals(expectedTodo.getStatus(), actualTodo.getStatus());
    }

    @Order(40)
    @Test
    public void testMovingATodo() {
        String postUrl = String.format("http://localhost:%d/api/todo", port);

        Todo todo = new Todo("", "desc", Status.IN_PROGRESS);
        ResponseEntity<Todo> actualTodoResponse = testRestTemplate.postForEntity(postUrl, todo, Todo.class);

        Todo createdTodo = actualTodoResponse.getBody();
        assertNotNull(createdTodo);
        // created todo always in status open
        assertEquals(Status.OPEN, createdTodo.getStatus());

        // move todo next status

        String putUrl = String.format("http://localhost:%d/api/todo/%s", port, createdTodo.getId());
        ResponseEntity<Todo> actualMovedResponse = testRestTemplate.exchange(putUrl, HttpMethod.PUT, HttpEntity.EMPTY, Todo.class);

        HttpStatus actualStatusCode = actualMovedResponse.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatusCode);

        Todo actualMovedTodo = actualMovedResponse.getBody();
        assertNotNull(actualMovedTodo);

        // todo in status open will be moved to status progress
        assertEquals(Status.IN_PROGRESS, actualMovedTodo.getStatus());
    }

    @Order(50)
    @Test
    public void testDeleteUnknownTodo() {
        String deleteUrl = String.format("http://localhost:%d/api/todo/%s", port, "unknown");
        ResponseEntity<Void> deleteResponse =
                testRestTemplate.exchange(deleteUrl, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        assertEquals(HttpStatus.NOT_FOUND, deleteResponse.getStatusCode());
    }

    @Order(60)
    @Test
    public void testDeleteBlankTodo() {
        String deleteUrl = String.format("http://localhost:%d/api/todo/%s", port, " ");
        ResponseEntity<Void> deleteResponse =
                testRestTemplate.exchange(deleteUrl, HttpMethod.DELETE, HttpEntity.EMPTY, Void.class);

        assertEquals(HttpStatus.BAD_REQUEST, deleteResponse.getStatusCode());
    }

    @Order(70)
    @Test
    public void deleteTodo() {
        // get current todos created in user journey
        String url = String.format("http://localhost:%d/api/todo", port);
        ResponseEntity<Todo[]> actualTodoResponse = testRestTemplate.getForEntity(url, Todo[].class);

        HttpStatus actualStatus = actualTodoResponse.getStatusCode();
        assertEquals(HttpStatus.OK, actualStatus);

        Todo[] actualTodoResponseBody = actualTodoResponse.getBody();
        assertNotNull(actualTodoResponseBody);
        assertEquals(2, actualTodoResponseBody.length);

        // delete all todos
        for (Todo todo : actualTodoResponseBody) {
            String deleteUrl = String.format("http://localhost:%d/api/todo/%s", port, todo.getId());

            ResponseEntity<Todo> deleteResponse =
                    testRestTemplate.exchange(deleteUrl, HttpMethod.DELETE, HttpEntity.EMPTY, Todo.class);

            assertEquals(HttpStatus.OK, deleteResponse.getStatusCode());
            assertEquals(todo, deleteResponse.getBody());
        }

        // fetch again all todos, result must be empty
        actualTodoResponse = testRestTemplate.getForEntity(url, Todo[].class);
        actualTodoResponseBody = actualTodoResponse.getBody();
        assertNotNull(actualTodoResponseBody);
        assertEquals(0, actualTodoResponseBody.length);
    }
}
