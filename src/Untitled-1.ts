  <div>
      {isLoggedIn && <Navbar />}
      <Router>
        <Routes>
        {isAdminRoute ? <Redirect to="/admin" /> : <Redirect to="/user" />}
          {/* Public routes accessible to all users */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/home" />} />
          <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />} />

          {/* Routes for authenticated users (both admin and regular user) */}
          {isLoggedIn && (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/courses" element={<CourseList />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/create-course" element={<CourseCreate />} />
              <Route path="/courses/:courseId/update" element={<CourseUpdate />} />
              <Route path="/courses/:courseId/course-content" element={<CourseContentCreate />} />
              {/* <Route path="/courses/:courseId/course-content/:id" element={<CourseContentDetails />} /> */}
            </>
          )}

          {/* Routes for admin */}
          {isAdmin && (
            <>
              {/* Add admin-specific routes here */}
            </>
          )}

          {/* Redirect to login if not authenticated */}
          {!isLoggedIn && <Navigate to="/login" />}
        </Routes>
      </Router>
    </div>