import React from 'react';
import _ from 'lodash';

import {Layout} from '../components/index';
import {markdownify, Link, toUrl, safePrefix, htmlToReact, getPages} from '../utils';

export default class Page extends React.Component {
    render() {
        let post_list = _.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), ['frontmatter.show_in_sidebar', true]), 'frontmatter.date', 'desc');
        let post_len = _.size(post_list);
        return (
            <Layout {...this.props}>
                <section id="main" class={'wrapper' + (_.get(this.props, 'pageContext.frontmatter.sidebar.enabled') ? ' sidebar ' + _.get(this.props, 'pageContext.frontmatter.sidebar.side') : '')}>
                    <div class="inner">
                        <header class="major">
                            <h2>{_.get(this.props, 'pageContext.frontmatter.title')}</h2>
                            {markdownify(_.get(this.props, 'pageContext.frontmatter.subtitle'))}
                        </header>
                        <div class="content">
                            {_.get(this.props, 'pageContext.frontmatter.content_img.enabled') && 
                                <Link to={safePrefix(toUrl(this.props.pageContext.pages, _.get(this.props, 'pageContext.frontmatter.content_img.url')))} class="image fit"><img src={safePrefix(_.get(this.props, 'pageContext.frontmatter.content_img.path'))} alt="" /></Link>
                            }
                            {htmlToReact(_.get(this.props, 'pageContext.html'))}
                        </div>
                        {_.get(this.props, 'pageContext.frontmatter.sidebar.enabled') && 
                            <div class="sidebar">
                                {
                                _.map(_.orderBy(_.filter(getPages(this.props.pageContext.pages, '/posts'), ['frontmatter.show_in_sidebar', true]), 'frontmatter.date', 'desc'), (post, post_idx) => (<React.Fragment key={post_idx}>
                                    <section key={post_idx}>
                                        {_.get(post, 'frontmatter.alt_img') && 
                                            <Link to={safePrefix(_.get(post, 'url'))} class="image fit"><img src={safePrefix(_.get(post, 'frontmatter.alt_img'))} alt="" /></Link>
                                        }
                                        <h3>{_.get(post, 'frontmatter.title')}</h3>
                                        {markdownify(_.get(post, 'frontmatter.excerpt'))}
                                        <footer>
                                            <ul class="actions">
                                                <li><Link to={safePrefix(_.get(post, 'url'))} class="button">Learn More</Link></li>
                                            </ul>
                                        </footer>
                                    </section>
                                    {(!(post_idx === post_len - 1)) && 
                                        <hr key={post_idx} />
                                    }
                                </React.Fragment>))}
                            </div>
                        }
                    </div>
                </section>
            </Layout>
        );
    }
}
