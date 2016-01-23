# .bashrc

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi

# User specific aliases and functions
export PERL5LIB=$HOME/data/cpan/lib/perl5
export PERL_MM_OPT=INSTALL_BASE=$HOME/data/cpan
export PERL_MB_OPT=INSTALL_BASE=$HOME/data/cpan
export PATH=/usr/local/bin/php53:/usr/local/php53/bin:$PATH 
alias top='/usr/bin/top -c -u p342419'
