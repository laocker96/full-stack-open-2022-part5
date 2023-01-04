import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Blog from './Blog'


describe('<Blog />', () => {
    let container

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

    beforeEach(() => {

        container = render(<Blog user={user} blog={blog} setBlogs={mockSetBlogsHandler} setNotification={mockSetNotificationHandler} />).container

    })


    test('a blog renders title and author, but not URL or likes by default', () => {


        const visibleDiv = container.querySelector('.visibleBlogContent')
        expect(visibleDiv).toBeVisible()

        const hiddenDiv = container.querySelector('.hiddenBlogContent')
        expect(hiddenDiv).toBeNull()

        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent('Canonical string reduction')
        expect(div).toHaveTextContent('Edsger W. Dijkstra')
        expect(div).not.toHaveTextContent('likes 21')
        expect(div).not.toHaveTextContent('Simone Bergamin')

    })

    test('a blog renders URL and number of likes when the button for details is clicked', async () => {

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const hiddenDiv = container.querySelector('.hiddenBlogContent')
        expect(hiddenDiv).toBeVisible()
        expect(hiddenDiv).toHaveTextContent('likes 21')
        expect(hiddenDiv).toHaveTextContent('Simone Bergamin')

    })
})