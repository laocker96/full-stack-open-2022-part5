import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import React from 'react'
import Blog from './Blog'


test('a blog render title and author, but not URL or likes by default', () => {

    const user = {
        name: 'Simone Bergamin'
    }

    const blog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 21,
        user: {
            name: 'Simone Bergamin'
        }
    }

    const mockSetBlogsHandler = jest.fn();

    const mockSetNotificationHandler = jest.fn();

    const { container } = render(<Blog user={user} blog={blog} setBlogs={mockSetBlogsHandler} setNotification={mockSetNotificationHandler} />)

    const visibleDiv = container.querySelector('.visibleBlogContent')
    expect(visibleDiv).toBeVisible()

    const hiddenDiv = container.querySelector('.hiddenBlogContent')
    expect(hiddenDiv).toBeNull()

    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Canonical string reduction')
    expect(div).toHaveTextContent('Edsger W. Dijkstra')
    expect(div).not.toHaveTextContent('Likes 21')
    expect(div).not.toHaveTextContent('Simone Bergamin')
  
})